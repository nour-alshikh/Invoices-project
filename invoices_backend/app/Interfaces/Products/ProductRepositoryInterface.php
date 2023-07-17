<?php

namespace App\Interfaces\Products;

interface ProductRepositoryInterface
{

    public function index();

    public function store($request);

    public function show($id);

    public function update($id, $request);

    public function destroy($id);

    public function getProducts($id);
}
