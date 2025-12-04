$baseUrl = "http://localhost:3000"

Write-Host "1. Testing GET /items..."
try {
    $items = Invoke-RestMethod -Uri "$baseUrl/items" -Method Get
    Write-Host "Success! Found $($items.data.Count) items."
} catch {
    Write-Host "Failed to get items: $_"
    exit 1
}

Write-Host "`n2. Testing POST /items with invalid video URL..."
$invalidItem = @{
    title = "Test Item"
    description = "Test Description"
    category = "Electricidad"
    price = 50
    videoUrl = "https://vimeo.com/123456"
    thumbnailKey = "test.jpg"
}
try {
    Invoke-RestMethod -Uri "$baseUrl/items" -Method Post -Body ($invalidItem | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Failed! Should have rejected invalid URL."
    exit 1
} catch {
    Write-Host "Success! Rejected invalid URL as expected."
}

Write-Host "`n3. Testing POST /items with valid video URL..."
$validItem = @{
    title = "Test Item Valid"
    description = "Test Description Valid"
    category = "Electricidad"
    price = 50
    videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    thumbnailKey = "test.jpg"
}
try {
    $newItem = Invoke-RestMethod -Uri "$baseUrl/items" -Method Post -Body ($validItem | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Success! Created item with ID: $($newItem.id)"
} catch {
    Write-Host "Failed to create valid item: $_"
    exit 1
}

Write-Host "`n4. Testing GET /favorites (should be empty initially or not contain new item)..."
try {
    $favorites = Invoke-RestMethod -Uri "$baseUrl/favorites" -Method Get
    Write-Host "Success! Found $($favorites.Count) favorites."
} catch {
    Write-Host "Failed to get favorites: $_"
    exit 1
}

Write-Host "`n5. Testing POST /favorites/:itemId..."
try {
    $fav = Invoke-RestMethod -Uri "$baseUrl/favorites/$($newItem.id)" -Method Post
    Write-Host "Success! Added to favorites."
} catch {
    Write-Host "Failed to add favorite: $_"
    exit 1
}

Write-Host "`n6. Testing GET /favorites (should contain new item)..."
try {
    $favorites = Invoke-RestMethod -Uri "$baseUrl/favorites" -Method Get
    $found = $favorites | Where-Object { $_.item.id -eq $newItem.id }
    if ($found) {
        Write-Host "Success! Item found in favorites."
    } else {
        Write-Host "Failed! Item NOT found in favorites."
        exit 1
    }
} catch {
    Write-Host "Failed to get favorites: $_"
    exit 1
}

Write-Host "`n7. Testing DELETE /favorites/:itemId..."
try {
    Invoke-RestMethod -Uri "$baseUrl/favorites/$($newItem.id)" -Method Delete
    Write-Host "Success! Removed from favorites."
} catch {
    Write-Host "Failed to remove favorite: $_"
    exit 1
}

Write-Host "`nVerification Complete!"
