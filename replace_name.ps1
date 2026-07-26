$srcPath = "c:\Users\Ayush_Chaubey\Downloads\Institute_project-main\Institute_project-main\frontend\src"
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.jsx","*.js","*.html","*.css"
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    $newContent = $content -replace "Sanskriti International College", "NextGen College"
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Done!"
