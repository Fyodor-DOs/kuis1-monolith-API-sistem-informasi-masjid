export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const [rows] = await pool.query('SELECT * FROM jadwal_kegiatan');
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching jadwal_kegiatan', error });
            }
            break;
        case 'POST':
            try {
                const { nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_pengurus } = req.body;
                await pool.query('INSERT INTO jadwal_kegiatan (nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_pengurus) VALUES (?, ?, ?, ?, ?, ?)',
                    [nama_kegiatan, deskripsi, tanggal, waktu, lokasi, id_pengurus]);
                res.status(201).json({ message: 'Jadwal kegiatan created successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error creating jadwal kegiatan', error });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}