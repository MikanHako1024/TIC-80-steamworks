#pragma once
#include <stdbool.h>

#ifdef __cplusplus
extern "C"
{
#endif

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

#ifdef __cplusplus
}
#endif
