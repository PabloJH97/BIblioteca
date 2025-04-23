<?php

namespace App\Loans\Controllers\Api;

use App\Core\Controllers\Controller;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoanApiController extends Controller
{
    public function index(Request $request, LoanIndexAction $action)
    {
        return response()->json($action($request->search, $request->integer('per_page', 10)));
    }

    public function show(Loan $loan)
    {
        return response()->json(['loan' => $loan]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'ISBN' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $loan = $action($validator->validated());

        return response()->json([
            'message' => __('messages.loans.created'),
            'loan' => $loan
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'ISBN' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $updatedLoan = $action($loan, $validator->validated());

        return response()->json([
            'message' => __('messages.loans.updated'),
            'loan' => $updatedLoan
        ]);
    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return response()->json([
            'message' => __('messages.loans.deleted')
        ]);
    }
}
