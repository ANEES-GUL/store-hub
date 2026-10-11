<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;


 class OrderController extends Controller
  {

    public function store(Request $request)
         {

        $request->validate([
            'items'            => 'required|array',
            'shipping_address' => 'required|string|max:255',
            'phone'            => 'required|string|max:50',
            'payment_method'   => 'required|string',
        ]);

        $calculatedTotal = collect($request->items)->sum(fn($item) => $item['price'] *  $item['quantity']);

        $order = Order::create ([

            'user_id'          => auth()->id(),                                   
            'customer_name'    => auth()->user()->name ?? 'Customer',             
            'customer_email'   => auth()->user()->email ?? 'customer@store.com',  
            'total_amount'     => $calculatedTotal,
            'total_price'      => $calculatedTotal,
            'payment_method'   => $request->payment_method,
            'shipping_address' => $request->shipping_address,
            'phone'            => $request->phone,
            'status'           => 'pending',                                      
        ]);
 
        foreach ($request->items as $item ) {

            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item['id'],
                'quantity'   => $item['quantity'],
                'price'      => $item['price'],
            ]);

        }
   
        return redirect()->route('account')->with(' success', 'Order placed successfully!');

    }
    
    public function updateStatus(Request $request, Order $order)
    {

        if (auth()->user()->email !== 'anees12345@gmail.com') {

                abort(403);
        }


        $request->validate([
              'status' => 'required|string|in: pending,processing,completed,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);


        return back()->with('success', 'Order status updated successfully.');

    }

}