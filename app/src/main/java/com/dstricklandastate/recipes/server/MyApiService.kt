package com.dstricklandastate.recipes.server

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET
import retrofit2.http.POST


private const val BASE_URL = "http://10.0.2.2:8080"

private val moshi = Moshi.Builder()
    .add(KotlinJsonAdapterFactory())
    .build()

private val retrofit = Retrofit.Builder()
    .addConverterFactory(MoshiConverterFactory.create())
    .baseUrl(BASE_URL)
    .build()

interface MyApiService {

    @GET("/search")
    suspend fun getSearchResults(query: String) : List<SearchResults>

    @POST("/create")
    fun createRecipe() : Boolean
}

object MyApi {
    val retrofitService : MyApiService by lazy {
        retrofit.create(MyApiService::class.java)
    }
}
