package com.dstricklandastate.recipes.server

import com.squareup.moshi.Json

data class CreateResults (
    @Json(name = "createResult") val createResult : Boolean
)