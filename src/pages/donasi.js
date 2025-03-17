import { useState } from 'react';

export default function DonasiPage() {
    const [formData, setFormData] = useState({
        id_jamaah: '',
        jumlah: '',
        metode_pembayaran: 'Transfer Bank',
        tanggal: new Date().toISOString().split('T')[0] 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/donasi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, status: 'Pending' }) 
        });

        const data = await response.json();
        alert(data.message);
    };

    return (
        <div>
            <h2>Form Donasi</h2>
            <form onSubmit={handleSubmit}>
                <label>ID Jamaah:</label>
                <input type="text" name="id_jamaah" value={formData.id_jamaah} onChange={handleChange} required />

                <label>Jumlah (Rp):</label>
                <input type="number" name="jumlah" value={formData.jumlah} onChange={handleChange} required />

                <label>Metode Pembayaran:</label>
                <select name="metode_pembayaran" value={formData.metode_pembayaran} onChange={handleChange}>
                    <option value="Transfer Bank">Transfer Bank</option>
                    <option value="QRIS">QRIS</option>
                    <option value="Tunai">Tunai</option>
                </select>

                <label>Tanggal:</label>
                <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} required />

                <button type="submit">Kirim Donasi</button>
            </form>
        </div>
    );
}
