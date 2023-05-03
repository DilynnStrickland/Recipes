package com.dstricklandastate.recipes.ui.create

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.dstricklandastate.recipes.databinding.FragmentCreateBinding
import com.google.android.material.snackbar.Snackbar

class CreateFragment : Fragment() {

    private var _binding: FragmentCreateBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val createViewModel =
            ViewModelProvider(this).get(CreateViewModel::class.java)

        _binding = FragmentCreateBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.Submit.setOnClickListener{
            Snackbar.make(binding.root, "submit", Snackbar.LENGTH_SHORT).show()
            createViewModel.createRecipe()
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}