import pool from '@/config/db';

export default async function handler(req, res) {
    const { id } = req.query;
    
    switch (req.method) {
        case 'GET':
            try {
                if (id) {
                    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id]);
                    if (rows.length === 0) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    return res.status(200).json(rows[0]);
                } else {
                    const [rows] = await pool.query('SELECT * FROM users');
                    return res.status(200).json(rows);
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error fetching users', error });
            }
        case 'POST':
            try {
                const { nama, email, password, role } = req.body;
                await pool.query('INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
                    [nama, email, password, role]);
                return res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Error creating user', error });
            }
        case 'PUT':
            try {
                const { nama, email, password, role } = req.body;
                await pool.query('UPDATE users SET nama = ?, email = ?, password = ?, role = ? WHERE id_user = ?',
                    [nama, email, password, role, id]);
                return res.status(200).json({ message: 'User updated successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Error updating user', error });
            }
        case 'DELETE':
            try {
                await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
                return res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Error deleting user', error });
            }
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}