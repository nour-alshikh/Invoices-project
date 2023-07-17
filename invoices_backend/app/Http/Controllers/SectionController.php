<?php

namespace App\Http\Controllers;

use App\Interfaces\Sections\SectionRepositoryInterface;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    private $sections;

    public function __construct(SectionRepositoryInterface $sections)

    {
        $this->sections = $sections;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->sections->index();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->sections->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->sections->show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        return $this->sections->update($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        return $this->sections->destroy($id);
    }
}
