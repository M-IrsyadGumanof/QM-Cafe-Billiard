import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function BilliardTables({ tables }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        table_number: '',
        name: '',
        status: 'available',
        description: '',
    });

    const openAdd = () => {
        reset();
        setEditData(null);
        setShowModal(true);
    };

    const openEdit = (table) => {
        setData({
            table_number: table.table_number,
            name: table.name,
            status: table.status,
            description: table.description ?? '',
        });
        setEditData(table);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            patch(route('admin.billiard-tables.update', editData.id), {
                onSuccess: () => { setShowModal(false); reset(); },
            });
        } else {
            post(route('admin.billiard-tables.store'), {
                onSuccess: () => { setShowModal(false); reset(); },
            });
        }
    };

    const handleDelete = (table) => {
        if (confirm(`Hapus meja ${table.name}?`)) {
            destroy(route('admin.billiard-tables.destroy', table.id));
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Billiard Tables</h1>
                <button
                    onClick={openAdd}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                    + Tambah Meja
                </button>
            </div>

            {/* Tabel */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">No. Meja</th>
                            <th className="px-6 py-3 text-left">Nama</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Deskripsi</th>
                            <th className="px-6 py-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tables.data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                    Belum ada meja.
                                </td>
                            </tr>
                        ) : (
                            tables.data.map((table) => (
                                <tr key={table.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono">{table.table_number}</td>
                                    <td className="px-6 py-4">{table.name}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={table.status} />
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{table.description ?? '-'}</td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <button
                                            onClick={() => openEdit(table)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(table)}
                                            className="text-red-600 hover:underline text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {editData ? 'Edit Meja' : 'Tambah Meja'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Meja</label>
                                <input
                                    type="text"
                                    value={data.table_number}
                                    onChange={(e) => setData('table_number', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.table_number && <p className="text-red-500 text-xs mt-1">{errors.table_number}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="available">Available</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="occupied">Occupied</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatusBadge({ status }) {
    const map = {
        available: 'bg-green-100 text-green-700',
        reserved: 'bg-blue-100 text-blue-700',
        occupied: 'bg-yellow-100 text-yellow-700',
        maintenance: 'bg-red-100 text-red-700',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
}