import pool from '@/config/db';

export default async function handler(req, res) {
    const { id, nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir } = req.query;

    switch (req.method) {
        case 'GET':  
            try {
                if (id) {
                    const [rows] = await pool.query('SELECT * FROM kegiatan WHERE id_kegiatan = ?', [id]);
                    if (rows.length === 0) {
                        return res.status(404).json({ message: 'Data kegiatan tidak ditemukan' });
                    }
                    res.status(200).json(rows[0]);
                } else {
                    const [rows] = await pool.query('SELECT * FROM kegiatan');
                    res.status(200).json(rows);
                }
            } catch (error) {
                res.status(500).json({ message: 'Gagal mengambil data kegiatan', error });
            }
            break;

        case 'POST':  
            try {
                await pool.query(
                    'INSERT INTO kegiatan (nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir) VALUES (?, ?, ?, ?, ?, ?)',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir]
                );
                res.status(201).json({ message: 'Data kegiatan berhasil ditambahkan' });
            } catch (error) {
                res.status(500).json({ message: 'Gagal menambahkan data kegiatan', error });
            }
            break;

        case 'PUT':  
            try {
                if (!id) {
                    return res.status(400).json({ message: 'Dibutuhkan ID untuk mengambil data kegiatan' });
                }
                await pool.query(
                    'UPDATE kegiatan SET nama_kegiatan = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, id_takmir = ? WHERE id_kegiatan = ?',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir, id]
                );
                res.status(200).json({ message: 'Data kegiatan berhasil diperbarui' });
            } catch (error) {
                res.status(500).json({ message: 'Gagal memperbarui data kegiatan', error });
            }
            break;

        case 'DELETE':  
            try {
                if (!id) {
                    return res.status(400).json({ message: 'Dibutuhkan ID untuk menghapus data kegiatan' });
                }
                await pool.query('DELETE FROM kegiatan WHERE id_kegiatan = ?', [id]);
                res.status(200).json({ message: 'Data kegiatan berhasil dihapus' });
            } catch (error) {
                res.status(500).json({ message: 'Gagal menghapus data kegiatan', error });
            }
            break;

        default:
            res.status(405).json({ message: 'Method tidak diizinkan' });
    }
}