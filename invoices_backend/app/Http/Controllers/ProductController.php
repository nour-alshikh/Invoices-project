<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response([
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->all();

        $product = Product::create([
            'product_name' => $fields['name'],
            'description' => $fields['description'],
            'section_id' => $fields['section_id'],
            'section_name' => $fields['section_name']
        ]);

        return response([
            'product' => $product
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        return response([
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        $product->product_name = $request->name;
        $product->description = $request->description;
        $product->section_id = $request->section_id;
        $product->section_name = $request->section_name;
        $product->save();

        return response([
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        $product->delete();

        return response("product$product Deleted");
    }

    public function getProducts($id)
    {
        $products = Product::where('section_id', '=', $id)->get();

        return response([
            'products' => $products
        ]);
    }
}
