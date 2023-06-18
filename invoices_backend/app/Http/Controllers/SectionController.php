<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sections = Section::all();
        return response([
            'sections' => $sections
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->all();

        $exist = Section::where('section_name', '=', $fields['name'])->first();

        if ($exist) {
            return response(['message' => 'Section already exists']);
        } else {
            $section = Section::create([
                'section_name' => $fields['name'],
                'description' => $fields['description'],
                'created_by' => $fields['created_by']
            ]);

            return response([
                'section' => $section
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $section = Section::find($id);
        return response([
            'section' => $section
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        $section = Section::find($id);

        $section->section_name = $request->name;
        $section->description = $request->description;
        $section->save();

        return response([
            'section' => $section
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $section = Section::find($id);

        $section->delete();

        return response("Section Deleted");
    }
}
