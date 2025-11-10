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

#ifdef __cplusplus
}
#endif
