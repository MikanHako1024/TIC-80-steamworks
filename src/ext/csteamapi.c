#include <stdbool.h>
#include "api.h"

bool steamapi_InitAPI(void);
bool steamapi_SetAchievement(const char* pchName);
bool steamapi_GetAchievement(const char* pchName, bool* pbAchieved);
bool steamapi_ClearAchievement(const char* pchName);
bool steamapi_ResetAllStats(bool bAchievementsToo);

bool tic_api_steam_init(tic_mem* memory)
{
    return steamapi_InitAPI();
}

bool tic_api_steam_sachi(tic_mem* memory, const char* pchName)
{
    return steamapi_SetAchievement(pchName);
}

bool tic_api_steam_gachi(tic_mem* memory, const char* pchName, bool* pbAchieved)
{
    return steamapi_GetAchievement(pchName, pbAchieved);
}

bool tic_api_steam_cachi(tic_mem* memory, const char* pchName)
{
    return steamapi_ClearAchievement(pchName);
}

bool tic_api_steam_rachi(tic_mem* memory, bool bAchievementsToo)
{
    return steamapi_ResetAllStats(bAchievementsToo);
}
