$ErrorActionPreference = "Stop"

if (-not (Test-Path "dist")) {
	Write-Host "No dist folder found. Building first..."
	npm run build
}

$token = $env:CLOUDFLARE_API_TOKEN
$accountId = $env:CLOUDFLARE_ACCOUNT_ID
$project = if ($env:CF_PAGES_PROJECT_NAME) { $env:CF_PAGES_PROJECT_NAME } else { "oakonsult-main-dev" }
$branch = if ($env:CF_PAGES_BRANCH) { $env:CF_PAGES_BRANCH } else { "main" }

if ([string]::IsNullOrWhiteSpace($token) -or [string]::IsNullOrWhiteSpace($accountId)) {
	Write-Error "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID before deploying."
}

Write-Host "Deploying Cloudflare Pages project '$project' on branch '$branch'..."

# Project may already exist; treat create conflicts as non-fatal.
$savedPreference = $ErrorActionPreference
$ErrorActionPreference = "Continue"
& npx --yes wrangler pages project create $project --production-branch main 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
	Write-Host "Project create skipped (already exists or no-op)."
}
$ErrorActionPreference = $savedPreference

npx --yes wrangler pages deploy dist --project-name $project --branch $branch --commit-dirty=true

$customDomain = $env:CF_DEV_DOMAIN
if (-not [string]::IsNullOrWhiteSpace($customDomain)) {
	Write-Host "Ensuring custom domain '$customDomain' is attached..."
	$headers = @{ Authorization = "Bearer $token" }
	$existing = Invoke-RestMethod -Method Get -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$project/domains" -Headers $headers
	$alreadyThere = $false
	if ($existing.success -and $existing.result) {
		$alreadyThere = $existing.result | Where-Object { $_.name -eq $customDomain } | Select-Object -First 1
	}
	if (-not $alreadyThere) {
		$body = @{ name = $customDomain } | ConvertTo-Json
		$add = Invoke-RestMethod -Method Post -Uri "https://api.cloudflare.com/client/v4/accounts/$accountId/pages/projects/$project/domains" -Headers $headers -ContentType "application/json" -Body $body
		if ($add.success) {
			Write-Host "Domain created with status: $($add.result.status)"
		}
	}
	else {
		Write-Host "Domain already attached."
	}
}
