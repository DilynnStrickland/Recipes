package com.dstricklandastate.recipes.server

import com.squareup.moshi.Json

data class SearchResults (
    @Json(name = "search_src") val searchSrcUrl: String
)