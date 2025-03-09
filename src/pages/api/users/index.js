import pool from '@/config/db';

export default async function handler(req, res) {
    const { id, nama, email, password, level } = req.query; 

    switch (req.method) {
        case 'GET':  
            try {
                if (id) {
                    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id]);
                    if (rows.length === 0) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                    res.status(200).json(rows[0]);
                } else {
                    const [rows] = await pool.query('SELECT * FROM users');
                    res.status(200).json(rows);
                }
            } catch (error) {
                res.status(500).json({ message: 'Error fetching users', error });
            }
            break;

        case 'POST':  
            try {
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
                if (!id) {
                    return res.status(400).json({ message: 'ID is required for updating user' });
                }
                await pool.query(
                    'UPDATE users SET nama = ?, email = ?, password = ?, level = ? WHERE id_user = ?',
                    [nama, email, password, level, id]
                );
                res.status(200).json({ message: 'User updated successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error updating user', error });
            }
            break;

        case 'DELETE':  
            try {
                if (!id) {
                    return res.status(400).json({ message: 'ID is required for deleting user' });
                }
                await pool.query('DELETE FROM users WHERE id_user = ?', [id]);
                res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
    }
}