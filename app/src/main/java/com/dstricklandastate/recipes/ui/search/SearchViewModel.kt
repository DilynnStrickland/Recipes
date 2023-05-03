package com.dstricklandastate.recipes.ui.search

import androidx.fragment.ktx.R
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dstricklandastate.recipes.server.MyApi
import kotlinx.coroutines.launch

class SearchViewModel : ViewModel() {

    private val _status = MutableLiveData<String>()
    val status: LiveData<String> = _status

    fun getSearchResults(query: String) {
        viewModelScope.launch {
            try {
                val searchResults = MyApi.retrofitService.getSearchResults(query)
                _status.value = "Success: \n" + searchResults
            } catch (e: Exception) {
                _status.value = "Failure: ${e.message}"
            }
        }
    }



}