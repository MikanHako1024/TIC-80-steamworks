#include "steamapi.h"
#include "../../include/steam/steam_api.h"

void Alert(const char* lpCaption, const char* lpText)
{
    fprintf(stderr, "Message: '%s', Detail: '%s'\n", lpCaption, lpText);
}

bool steamapi_InitAPI(void)
{
    if (SteamAPI_RestartAppIfNecessary(k_uAppIdInvalid))
    {
        // if Steam is not running or the game wasn't started through Steam, SteamAPI_RestartAppIfNecessary starts the
        // local Steam client and also launches this game again.

        // Once you get a public Steam AppID assigned for this game, you need to replace k_uAppIdInvalid with it and
        // removed steam_appid.txt from the game depot.

        return false;
    }

    // Initialize SteamAPI, if this fails we bail out since we depend on Steam for lots of stuff.
    // You don't necessarily have to though if you write your code to check whether all the Steam
    // interfaces are NULL before using them and provide alternate paths when they are unavailable.
    //
    // This will also load the in-game steam overlay dll into your process.  That dll is normally
    // injected by steam when it launches games, but by calling this you cause it to always load,
    // even when not launched via steam.
    SteamErrMsg errMsg = {0};
    if (SteamAPI_InitEx(&errMsg) != k_ESteamAPIInitResult_OK)
    {
        printf("SteamAPI_Init() failed: ");
        printf(errMsg);
        printf("\n");
        Alert("Fatal Error", "Steam must be running to play this game (SteamAPI_Init() failed).\n");
        return false;
    }

    // Ensure that the user has logged into Steam. This will always return true if the game is launched
    // from Steam, but if Steam is at the login prompt when you run your game from the debugger, it
    // will return false.
    if (!SteamUser()->BLoggedOn())
    {
        printf("Steam user is not logged in\n");
        Alert("Fatal Error", "Steam user must be logged in to play this game (SteamUser()->BLoggedOn() returned false).\n");
        return false;
    }

    if (!SteamInput()->Init(false))
    {
        printf("SteamInput()->Init failed.\n");
        Alert("Fatal Error", "SteamInput()->Init failed.\n");
        return false;
    }

    printf("Steam API Inited! AppId=%d\n", SteamUtils()->GetAppID());

    return true;
}

//ISteamUserStats* m_pSteamUserStats = SteamUserStats();

//SteamUser
//SteamUserStats
//RequestCurrentStats

bool steamapi_SetAchievement(const char* pchName)
{
    bool ok = SteamUserStats()->SetAchievement(pchName);
    SteamUserStats()->StoreStats();
    return ok;
}

bool steamapi_GetAchievement(const char* pchName, bool* pbAchieved)
{
    bool bAchieved = false;
    bool ok = SteamUserStats()->GetAchievement(pchName, pbAchieved);
    SteamUserStats()->StoreStats();
    return ok;
}

bool steamapi_ClearAchievement(const char* pchName)
{
    bool ok = SteamUserStats()->ClearAchievement(pchName);
    SteamUserStats()->StoreStats();
    return ok;
}

bool steamapi_ResetAllStats(bool bAchievementsToo)
{
    bool ok = SteamUserStats()->ResetAllStats(bAchievementsToo);
    SteamUserStats()->StoreStats();
    return ok;
}

// bool GetUserStat(CSteamID steamIDUser, const char *pchName, int32 *pData);
// bool GetUserStat(CSteamID steamIDUser, const char* pchName, float* pData);
// bool IndicateAchievementProgressconst char *pchName, uint32 nCurProgress, uint32 nMaxProgress£©;
