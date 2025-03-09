export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const [rows] = await pool.query('SELECT * FROM keuangan');
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching keuangan', error });
            }
            break;
        case 'POST':
            try {
                const { jenis, jumlah, deskripsi, tanggal, id_bendahara } = req.body;
                await pool.query('INSERT INTO keuangan (jenis, jumlah, deskripsi, tanggal, id_bendahara) VALUES (?, ?, ?, ?, ?)',
                    [jenis, jumlah, deskripsi, tanggal, id_bendahara]);
                res.status(201).json({ message: 'Keuangan created successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error creating keuangan', error });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}