import CustomerLayout from "@/Layouts/CustomerLayout";
import { money } from "@/Components/Shared/Format";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
export default function Checkout() {
    const [items, setItems] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        items: [],
        payment_method: "transfer",
        notes: "",
    });
    useEffect(() => {
        const c = JSON.parse(localStorage.getItem("qm_cart") || "[]");
        setItems(c);
        setData(
            "items",
            c.map((i) => ({ menu_id: i.menu_id, quantity: i.quantity })),
        );
    }, []);
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const submit = (e) => {
        e.preventDefault();
        post("/customer/checkout", {
            onSuccess: () => localStorage.removeItem("qm_cart"),
        });
    };
    return (
        <CustomerLayout>
            <h1 className="text-3xl font-black">Checkout</h1>
            <form
                onSubmit={submit}
                className="mt-6 grid gap-6 lg:grid-cols-[1fr,360px]"
            >
                <div className="rounded-[7px] border border-[#2b3232] bg-[#1d2222] p-5">
                    {items.map((i) => (
                        <div
                            key={i.menu_id}
                            className="flex justify-between border-b border-[#2b3232] py-3"
                        >
                            <span>
                                {i.name} x {i.quantity}
                            </span>
                            <span>{money(i.price * i.quantity)}</span>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <p className="text-[#9aa7b3]">Cart kosong.</p>
                    )}
                </div>
                <div className="rounded-[7px] border border-[#2b3232] bg-[#1d2222] p-5">
                    <label className="text-sm text-[#9aa7b3]">
                        Payment Method
                    </label>
                    <select
                        value={data.payment_method}
                        onChange={(e) =>
                            setData("payment_method", e.target.value)
                        }
                        className="mt-2 w-full rounded bg-[#151919] text-white"
                    >
                        <option value="transfer">Transfer</option>
                        <option value="qris">QRIS</option>
                        <option value="cash">Cash</option>
                    </select>
                    <label className="mt-4 block text-sm text-[#9aa7b3]">
                        Notes
                    </label>
                    <textarea
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        className="mt-2 w-full rounded bg-[#151919] text-white"
                    />
                    <div className="mt-4 flex justify-between text-xl font-black">
                        <span>Total</span>
                        <span className="text-[#ffcc00]">{money(total)}</span>
                    </div>
                    <button
                        disabled={processing || items.length === 0}
                        className="mt-5 w-full rounded-[7px] bg-[#ffcc00] px-5 py-3 font-extrabold text-[#151919] disabled:opacity-50"
                    >
                        Place Order
                    </button>
                    {errors.items && (
                        <p className="mt-2 text-sm text-red-300">
                            {errors.items}
                        </p>
                    )}
                </div>
            </form>
        </CustomerLayout>
    );
}
