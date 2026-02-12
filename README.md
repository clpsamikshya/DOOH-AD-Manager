#  DOOH Ad Manager
- A simple DOOH Ad Manager system to manage Screens, Ads, Campaigns, generate playlists, 
and log Proof of Play.

# 1. Technologies Used
- Backend: ASP.NET Core Web API
- Frontend: Angular 20 
- Database: SQL Server
- API Documentation: Swagger


# 2. Features
- Manage digital Screens
- Create and manage Ads
- Schedule Ads using Campaigns
- Generate dynamic Playlists per Screen
- Track playback using Proof of Play
- Supports CORS for frontend-backend communication across different ports


# 3. System Modules
## Screens
- Represents physical digital displays.
- Fields:-Id (GUID), Name, Location, Resolution, Status (active/inactive)

## Ads
- Represents media content displayed on screens.
- Fields:-Id (GUID), Title, ScreenId (FK), MediaUrl, MediaType (Image / Video), Duration (seconds)

## Campaigns
- Controls scheduling and ordering of ads.
- Fields:-Id (GUID). Name, StartTime (UTC), EndTime (UTC), 
- Relationships:-CampaignScreens, CampaignAds

## Playlist 
- There is NO separate Playlist table.
- Playlist is generated dynamically using GET /api/screens/{id}/playlist
- It returns:- Active campaigns, Only ads assigned to that screen

## Proof of Play
- Tracks when an ad was actually played.
- Fields:-Id, ScreenId, AdId, PlayedAt (UTC)

# 4. API Endpoints (Swagger)
## Ads
GET     /api/ads
POST    /api/ads
GET     /api/ads/{id}
PUT     /api/ads/{id}
DELETE  /api/ads/{id}

## Screens
GET     /api/screens
POST    /api/screens
PUT     /api/screens/{id}
DELETE  /api/screens/{id}

## Campaigns
GET     /api/campaigns
POST    /api/campaigns
GET     /api/campaigns/{id}
DELETE  /api/campaigns/{id}

## CampaignAds
GET     /api/campaign-ads
POST    /api/campaign-ads
DELETE  /api/campaign-ads/{id}

## CampaignScreens
GET     /api/campaign-screens
POST    /api/campaign-screens
DELETE  /api/campaign-screens/{id}

## Playlist
GET /api/screens/{id}/playlist

## Proof of Play
POST /api/proof
GET  /api/proof

# 5. Testing via Swagger
- Create Screen
- Create Ads
- Create Campaign
- Add CampaignScreens
- Add CampaignAds
- Call Playlist endpoint
- Log ProofOfPlay

# 7. Setup / Run Instructions

## Backend (ASP.NET Core Web API):
- Open solution in Visual Studio.
- Restore NuGet packages.
- Update `appsettings.json` with your SQL Server connection string.
- Run the project (`F5` or `dotnet run`).

## Frontend :
- Open terminal in frontend folder.
- Run `npm install`.
- Run `ng serve` for development (`http://localhost:4200`).

## Database:
- Create a SQL Server database.
- Run EF Core migrations (if used) or execute the provided SQL scripts to create tables.


# 7. Limitations 
- CampaignAd and CampaignScreen Cannot Be Updated
- Campaigns Cannot Be UpdatedAds Are Tied to a Single Screen
- Code structure is not fully consistent 
  (some modules use DTOs while others do not, and there are multiple service folders, etc).

# 8.  Example API Request + Response
- Endpoint: Get playlist for a screen
- Request:  GET /api/screens/510b3c56-913e-4dd7-8424-4ef116b8a087/playlist?at=2026-02-12T10:30:00Z
- Response body:
[
  {
    "id": "3a10ac0b-3203-45ca-89b4-60c19a405530",
    "title": "Adidas Promo",
    "mediaUrl": "https://example.com/ads/adidas.mp4",
    "durationSeconds": 30,
    "mediaType": "Image",
    "createdAt": "2026-02-11T18:39:31.4233333",
    "screenId": "510b3c56-913e-4dd7-8424-4ef116b8a087",
    "screen": null,
    "campaignAds": []
  },
  {
    "id": "57f7ff3b-91fb-4a69-ab9f-82b88c2ce1df",
    "title": "Coca-Cola Summer Refresh",
    "mediaUrl": "https://example.com/ads/coca_cola.mp4",
    "durationSeconds": 30,
    "mediaType": "video",
    "createdAt": "2026-02-11T18:39:31.4233333",
    "screenId": "510b3c56-913e-4dd7-8424-4ef116b8a087",
    "screen": null,
    "campaignAds": []
  },
  {
    "id": "22dfa563-a8f5-4459-8414-b4324399a97f",
    "title": "Nike Air Max Promo",
    "mediaUrl": "https://example.com/ads/nike_airmax.mp4",
    "durationSeconds": 30,
    "mediaType": "video",
    "createdAt": "2026-02-11T18:39:31.4233333",
    "screenId": "510b3c56-913e-4dd7-8424-4ef116b8a087",
    "screen": null,
    "campaignAds": []
  }
]