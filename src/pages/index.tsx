import Link from 'next/link';

export default function HomePage() {
    return (
        <div>
            <h1>Selamat Datang di Sistem Manajemen Masjid</h1>
            <Link href="/users">
                Daftar Pengguna
            </Link>
            <br />
            <Link href="/kegiatan">
                Daftar Kegiatan
            </Link>
            <br />
            <Link href="/donasi">
                Daftar Donasi
            </Link>
            <br />
            <Link href="/keuangan">
                Data Keuangan
            </Link>
        </div>
    );
}