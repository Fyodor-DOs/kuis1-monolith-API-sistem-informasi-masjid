import pool from '@/config/db';

export default async function handler(req, res) {
    const { method, body, query } = req;
    const { id } = query;

    switch (method) {
        case 'GET':  
            try {
                const [rows] = await pool.query('SELECT * FROM keuangan ORDER BY tanggal DESC');
                return res.status(200).json(rows);
            } catch (error) {
                return res.status(500).json({ message: 'Gagal mengambil data keuangan', error: error.message });
            }

        case 'POST': 
            try {
                const { jenis, jumlah, deskripsi = '', tanggal, id_takmir } = body;
                
                if (!jenis || !jumlah || !tanggal) {
                    return res.status(400).json({ message: 'Jenis, jumlah, dan tanggal wajib diisi' });
                }

                const result = await pool.query(
                    'INSERT INTO keuangan (jenis, jumlah, deskripsi, tanggal, id_takmir) VALUES (?, ?, ?, ?, ?)',
                    [jenis, jumlah, deskripsi, tanggal, id_takmir]
                );

                return res.status(201).json({ message: 'Data keuangan berhasil ditambahkan', id_keuangan: result.insertId });
            } catch (error) {
                return res.status(500).json({ message: 'Gagal menambahkan data keuangan', error: error.message });
            }

        case 'PUT': 
            try {
                if (!id) {
                    return res.status(400).json({ message: 'Dibutuhkan ID untuk memperbarui data keuangan' });
                }

                const { jenis, jumlah, deskripsi = '', tanggal, id_takmir } = body;

                await pool.query(
                    'UPDATE keuangan SET jenis=?, jumlah=?, deskripsi=?, tanggal=?, id_takmir=? WHERE id_keuangan=?',
                    [jenis, jumlah, deskripsi, tanggal, id_takmir, id]
                );

                return res.status(200).json({ message: 'Data keuangan berhasil diperbarui' });
            } catch (error) {
                return res.status(500).json({ message: 'Gagal memperbarui data', error: error.message });
            }

        case 'DELETE': 
            try {
                if (!id) {
                    return res.status(400).json({ message: 'Dibutuhkan ID untuk menghapus data keuangan' });
                }

                await pool.query('DELETE FROM keuangan WHERE id_keuangan=?', [id]);
                return res.status(200).json({ message: 'Data keuangan berhasil dihapus' });
            } catch (error) {
                return res.status(500).json({ message: 'Gagal menghapus data', error: error.message });
            }

        default:
            return res.status(405).json({ message: 'Method tidak diizinkan' });
    }
}
