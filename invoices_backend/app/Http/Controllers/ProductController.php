<?php

namespace App\Http\Controllers;

use App\Interfaces\Products\ProductRepositoryInterface;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $products;

    public function __construct(ProductRepositoryInterface $products)

    {
        $this->products = $products;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->products->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->products->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->products->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        return $this->products->show($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->products->show($id);
    }

    public function getProducts($id)
    {
        return $this->products->getProducts($id);
    }
}
