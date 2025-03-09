import pool from '@/config/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const [rows] = await pool.query('SELECT * FROM kegiatan');
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching kegiatan', error });
            }
            break;
        case 'POST':
            try {
                const { nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir } = req.body;
                await pool.query('INSERT INTO kegiatan (nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir) VALUES (?, ?, ?, ?, ?, ?)',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir]);
                res.status(201).json({ message: 'Kegiatan created successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error creating kegiatan', error });
            }
            break;
        case 'PUT':  
            try {
                const { id, nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir } = req.body;
                await pool.query(
                    'UPDATE kegiatan SET nama_kegiatan = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, id_takmir = ? WHERE id_kegiatan = ?',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_takmir, id]
                );
                res.status(200).json({ message: 'Kegiatan updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating kegiatan', error });
            }
            break;
        case 'DELETE':  
            try {
                const { id } = req.body;
                await pool.query('DELETE FROM kegiatan WHERE id_kegiatan = ?', [id]);
                res.status(200).json({ message: 'Kegiatan deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting kegiatan', error });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}