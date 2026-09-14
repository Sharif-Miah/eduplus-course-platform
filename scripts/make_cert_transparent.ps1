Add-Type -AssemblyName System.Drawing

function Remove-WhiteBg($inputPath, $outputPath, $threshold) {
    $bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
    $outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $p = $bmp.GetPixel($x, $y)
            if ($p.R -ge $threshold -and $p.G -ge $threshold -and $p.B -ge $threshold) {
                $minC = [Math]::Min($p.R, [Math]::Min($p.G, $p.B))
                if ($minC -ge ($threshold + 10)) {
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } else {
                    $alpha = [int]([Math]::Max(0, [Math]::Min(255, (255 - $minC) * 15)))
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, [Math]::Min(30, $p.R), [Math]::Min(30, $p.G), [Math]::Min(30, $p.B)))
                }
            } else {
                $outBmp.SetPixel($x, $y, $p)
            }
        }
    }
    
    $outBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $outBmp.Dispose()
    Write-Host "Processed: $outputPath"
}

Remove-WhiteBg "c:\Sharif\educonnect\public\sharif_signature.jpg" "c:\Sharif\educonnect\public\sharif_signature.png" 225
Remove-WhiteBg "c:\Sharif\educonnect\public\cert_gold_seal.jpg" "c:\Sharif\educonnect\public\cert_gold_seal.png" 240
Remove-WhiteBg "c:\Sharif\educonnect\public\educonnect_cert_logo.jpg" "c:\Sharif\educonnect\public\educonnect_cert_logo.png" 240
