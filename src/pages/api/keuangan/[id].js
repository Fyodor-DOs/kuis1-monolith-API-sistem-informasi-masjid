import pool from '@/config/db';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':  
            try {
                const [rows] = await pool.query('SELECT * FROM keuangan WHERE id_keuangan = ?', [id]);
                if (rows.length === 0) {
                    return res.status(404).json({ message: 'Keuangan not found' });
                }
                res.status(200).json(rows[0]);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching keuangan', error });
            }
            break;

        case 'PUT':  
            try {
                const { jenis, jumlah, deskripsi, tanggal, id_bendahara } = req.body;
                await pool.query(
                    'UPDATE keuangan SET jenis = ?, jumlah = ?, deskripsi = ?, tanggal = ?, id_bendahara = ? WHERE id_keuangan = ?',
                    [jenis, jumlah, deskripsi, tanggal, id_bendahara, id]
                );
                res.status(200).json({ message: 'Keuangan updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating keuangan', error });
            }
            break;

        case 'DELETE':  
            try {
                await pool.query('DELETE FROM keuangan WHERE id_keuangan = ?', [id]);
                res.status(200).json({ message: 'Keuangan deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting keuangan', error });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}
