import pool from '@/config/db';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const [rows] = await pool.query('SELECT * FROM users');
                res.status(200).json(rows);
            } catch (error) {
                res.status(500).json({ message: 'Error fetching users', error });
            }
            break;
        
        case 'POST':
            try {
                const { nama, email, password, level } = req.body;
                await pool.query(
                    'INSERT INTO users (nama, email, password, level) VALUES (?, ?, ?, ?)',
                    [nama, email, password, level]
                );
                res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error creating user', error });
            }
            break;

        case 'PUT':
            try {
                const { id_user, nama, email, password, level } = req.body;
                await pool.query(
                    'UPDATE users SET nama = ?, email = ?, password = ?, level = ? WHERE id_user = ?',
                    [nama, email, password, level, id_user]
                );
                res.status(200).json({ message: 'User updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating user', error });
            }
            break;

        case 'DELETE':
            try {
                const { id_user } = req.body;
                await pool.query('DELETE FROM users WHERE id_user = ?', [id_user]);
                res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}
