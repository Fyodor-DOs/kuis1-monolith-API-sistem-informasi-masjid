import Link from 'next/link';

export default function HomePage() {
    return (
        <div>
            <h1>Selamat Datang di Sistem Manajemen Masjid</h1>
            <Link href="/users">
                Lihat Daftar Pengguna
            </Link>
        </div>
    );
}