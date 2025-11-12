#include <stdbool.h>
#include "api.h"

bool steamapi_InitAPI(void);
bool steamapi_SetAchievement(const char* pchName);
bool steamapi_GetAchievement(const char* pchName, bool* pbAchieved);
bool steamapi_ClearAchievement(const char* pchName);
bool steamapi_ResetAllStats(bool bAchievementsToo);
bool steamapi_SetStatN(const char* pchName, int nData);
bool steamapi_SetStatF(const char* pchName, float fData);
bool steamapi_GetStatN(const char* pchName, int* pnData);
bool steamapi_GetStatF(const char* pchName, float* pfData);
bool steamapi_IndicateAchiProgress(const char* pchName, unsigned int nCurProgress, unsigned int nMaxProgress);

bool tic_api_steam_init(tic_mem* memory)
{
    return steamapi_InitAPI();
}

bool tic_api_steam_achi(tic_mem* memory, const char* pchName, bool forGet, bool* pbAchieved)
{
    if (forGet)
        return steamapi_GetAchievement(pchName, pbAchieved);
    else
    {
        if (*pbAchieved == true)
            return steamapi_SetAchievement(pchName);
        else
            return steamapi_ClearAchievement(pchName);
    }
}

bool tic_api_steam_nstat(tic_mem* memory, const char* pchName, bool forGet, s32* pnData)
{
    if (forGet)
        return steamapi_GetStatN(pchName, pnData);
    else
        return steamapi_SetStatN(pchName, *pnData);
}

bool tic_api_steam_fstat(tic_mem* memory, const char* pchName, bool forGet, float* pfData)
{
    if (forGet)
        return steamapi_GetStatF(pchName, pfData);
    else
        return steamapi_SetStatF(pchName, *pfData);
}

bool tic_api_steam_rstat(tic_mem* memory, bool bAchievementsToo)
{
    return steamapi_ResetAllStats(bAchievementsToo);
}

bool tic_api_steam_prog(tic_mem* memory, const char* pchName, u32 nCurProgress, u32 nMaxProgress)
{
    return steamapi_IndicateAchiProgress(pchName, nCurProgress, nMaxProgress);
}
