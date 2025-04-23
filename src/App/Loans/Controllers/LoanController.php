<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('loans/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('loans/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, LoanStoreAction $action)
    {

        $validator = Validator::make($request->all(), [
            'ISBN' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255'],


        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Loan $loan)
    {
        return Inertia::render('loans/Edit', [
            'loan' => $loan,
            'page' => $request->query('page'),
            'perPage' => $request->query('perPage'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'ISBN' => ['string', 'max:255'],
            'email' => ['string', 'max:255'],
            'returned_date' => ['string'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        $redirectUrl = route('loans.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}
