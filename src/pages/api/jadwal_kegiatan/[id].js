import pool from '@/config/db';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':  
            try {
                const [rows] = await pool.query('SELECT * FROM jadwal_kegiatan WHERE id_kegiatan = ?', [id]);
                if (rows.length === 0) {
                    return res.status(404).json({ message: 'Jadwal kegiatan not found' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching jadwal kegiatan', error });
            }
            break;

        case 'PUT':  
            try {
                const { nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_pengurus } = req.body;
                await pool.query(
                    'UPDATE jadwal_kegiatan SET nama_kegiatan = ?, deskripsi = ?, tanggal = ?, waktu = ?, lokasi = ?, id_pengurus = ? WHERE id_kegiatan = ?',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_pengurus, id]
                );
                res.status(200).json({ message: 'Jadwal kegiatan updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating jadwal kegiatan', error });
            }
            break;

        case 'DELETE':  
            try {
                await pool.query('DELETE FROM jadwal_kegiatan WHERE id_kegiatan = ?', [id]);
                res.status(200).json({ message: 'Jadwal kegiatan deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting jadwal kegiatan', error });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}
