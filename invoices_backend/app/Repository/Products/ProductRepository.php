<?php

namespace App\Repository\Products;

use App\Interfaces\Products\ProductRepositoryInterface;
use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{

    public function index()
    {
        $products = Product::all();
        return response([
            'products' => $products
        ]);
    }


    public function store($request)
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

    public function show($id)
    {
        $product = Product::find($id);
        return response([
            'product' => $product
        ]);
    }

    public function update($id, $request)
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
