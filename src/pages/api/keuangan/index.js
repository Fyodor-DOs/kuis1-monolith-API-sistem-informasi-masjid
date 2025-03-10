import pool from '@/config/db';

export default async function handler(req, res) {
    const { method, body, query } = req;
    const { id } = query;

    switch (method) {
        case 'GET':  
            try {
                const [rows] = await pool.query('SELECT * FROM keuangan');
                return res.status(200).json(rows);
            } catch (error) {
                return res.status(500).json({ message: 'Gagal mengambil data keuangan', error });
            }

        case 'POST': 
            try {
                const jenis = body.jenis || query.jenis;
                const jumlah = body.jumlah || query.jumlah;
                const deskripsi = body.deskripsi || query.deskripsi || '';
                const tanggal = body.tanggal || query.tanggal;
                const id_takmir = body.id_takmir || query.id_takmir;

                if (!jenis || !jumlah || !tanggal) {
                    return res.status(400).json({ message: 'Jenis, jumlah, dan tanggal wajib diisi' });
                }

                await pool.query(
                    'INSERT INTO keuangan (jenis, jumlah, deskripsi, tanggal, id_takmir) VALUES (?, ?, ?, ?, ?)',
                    [jenis, jumlah, deskripsi, tanggal, id_takmir]
                );

                return res.status(201).json({ message: 'Data keuangan berhasil ditambahkan' });
            } catch (error) {
                return res.status(500).json({ message: 'Gagal menambahkan data keuangan', error });
            }

        case 'PUT': 
            try {
                if (!id) {
                    return res.status(400).json({ message: 'Dibutuhkan ID untuk memperbarui data keuangan' });
                }

                const jenis = body.jenis || query.jenis;
                const jumlah = body.jumlah || query.jumlah;
                const deskripsi = body.deskripsi || query.deskripsi || '';
                const tanggal = body.tanggal || query.tanggal;
                const id_takmir = body.id_takmir || query.id_takmir;

                await pool.query(
                    'UPDATE keuangan SET jenis=?, jumlah=?, deskripsi=?, tanggal=?, id_takmir=? WHERE id_keuangan=?',
                    [jenis, jumlah, deskripsi, tanggal, id_takmir, id]
                );

                return res.status(200).json({ message: 'Data keuangan berhasil diperbarui' });
            } catch (error) {
                return res.status(500).json({ message: 'Gagal memperbarui data', error });
            }

        default:
            return res.status(405).json({ message: 'Method tidak diizinkan' });
    }
}
