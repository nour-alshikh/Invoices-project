<?php

namespace App\Interfaces\Sections;

interface SectionRepositoryInterface
{

    public function index();

    public function store($request);

    public function show($id);

    public function update($id, $request);

    public function destroy($id);
}
