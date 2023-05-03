package com.dstricklandastate.recipes.ui.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.dstricklandastate.recipes.databinding.FragmentSearchBinding
import com.google.android.material.snackbar.Snackbar

class SearchFragment : Fragment() {

    private var _binding: FragmentSearchBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val SearchViewModel =
            ViewModelProvider(this).get(SearchViewModel::class.java)

        _binding = FragmentSearchBinding.inflate(inflater, container, false)
        val root: View = binding.root
        val searchList = binding.searchList
        binding.searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query : String): Boolean {
                binding.searchView.clearFocus()
                val searchResults = SearchViewModel.getSearchResults(query)
                Snackbar.make(searchList, "submit", Snackbar.LENGTH_SHORT).show()
                return false
            }

            override fun onQueryTextChange(newText : String): Boolean {
                // something happens
                return false
            }
        })
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}