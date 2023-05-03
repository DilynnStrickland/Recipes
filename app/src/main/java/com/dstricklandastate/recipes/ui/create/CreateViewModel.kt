package com.dstricklandastate.recipes.ui.create

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dstricklandastate.recipes.server.MyApi
import kotlinx.coroutines.launch

class CreateViewModel : ViewModel() {

    private val _status = MutableLiveData<String>()
    val status: LiveData<String> = _status

    fun createRecipe() {
        viewModelScope.launch {
            try {
                MyApi.retrofitService.createRecipe()
                _status.value = "Success: \n"
            } catch (e: Exception) {
                _status.value = "Failure: ${e.message}"
            }
        }
    }
}