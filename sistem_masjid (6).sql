-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 17, 2025 at 03:50 AM
-- Server version: 8.0.40
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem_masjid`
--

-- --------------------------------------------------------

--
-- Table structure for table `donasi`
--

CREATE TABLE `donasi` (
  `id_donasi` int NOT NULL,
  `id_jamaah` int DEFAULT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `metode_pembayaran` enum('Transfer Bank','QRIS','Tunai') NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('Pending','Sukses','Gagal') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `donasi`
--

INSERT INTO `donasi` (`id_donasi`, `id_jamaah`, `jumlah`, `metode_pembayaran`, `tanggal`, `status`) VALUES
(1, 4, 4444.00, 'Transfer Bank', '2024-04-04', 'Sukses'),
(2, 2, 7777777.00, 'QRIS', '2025-03-17', 'Sukses'),
(3, 1, 666666.00, 'Tunai', '2025-03-17', 'Sukses');

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id_kegiatan` int NOT NULL,
  `nama_kegiatan` varchar(150) NOT NULL,
  `deskripsi` text,
  `tanggal` date NOT NULL,
  `waktu` time NOT NULL,
  `lokasi` varchar(255) DEFAULT NULL,
  `id_takmir` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id_kegiatan`, `nama_kegiatan`, `deskripsi`, `tanggal`, `waktu`, `lokasi`, `id_takmir`) VALUES
(1, 'Pengajian Ibu-Ibu', 'Pengajian khusus ibu-ibu setiap Rabu sore', '2025-03-12', '16:00:00', 'Ruang Serbaguna', 3);

-- --------------------------------------------------------

--
-- Table structure for table `keuangan`
--

CREATE TABLE `keuangan` (
  `id_keuangan` int NOT NULL,
  `jenis` enum('Pemasukan','Pengeluaran') NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `deskripsi` text,
  `tanggal` date NOT NULL,
  `id_takmir` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `keuangan`
--

INSERT INTO `keuangan` (`id_keuangan`, `jenis`, `jumlah`, `deskripsi`, `tanggal`, `id_takmir`) VALUES
(1, 'Pemasukan', 4444.00, 'Donasi #1', '2024-04-04', NULL),
(2, 'Pemasukan', 7777777.00, 'Donasi #2', '2025-03-17', NULL),
(3, 'Pemasukan', 666666.00, 'Donasi #3', '2025-03-17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `laporan_keuangan`
--

CREATE TABLE `laporan_keuangan` (
  `id_laporan` int NOT NULL,
  `periode` date NOT NULL,
  `total_pemasukan` decimal(15,2) NOT NULL,
  `total_pengeluaran` decimal(15,2) NOT NULL,
  `saldo` decimal(15,2) NOT NULL,
  `id_takmir` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `level` tinyint NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `nama`, `email`, `password`, `created_at`, `level`) VALUES
(1, 'Ali Rahman', 'ali@gmail.com', '12345678', '2025-03-09 12:30:15', 3),
(2, 'Budi Subhi', 'budi@gmail.com', '12345678', '2025-03-09 13:08:23', 1),
(3, 'Cecil Stedman', 'cecil@gmail.com', '12345678', '2025-03-09 15:36:36', 2),
(4, 'Dandy Stedman', 'dandy123@gmail.com', '12345678', '2025-03-09 15:51:13', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donasi`
--
ALTER TABLE `donasi`
  ADD PRIMARY KEY (`id_donasi`),
  ADD KEY `id_jamaah` (`id_jamaah`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id_kegiatan`),
  ADD KEY `id_pengurus` (`id_takmir`);

--
-- Indexes for table `keuangan`
--
ALTER TABLE `keuangan`
  ADD PRIMARY KEY (`id_keuangan`),
  ADD KEY `id_bendahara` (`id_takmir`);

--
-- Indexes for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  ADD PRIMARY KEY (`id_laporan`),
  ADD KEY `dibuat_oleh` (`id_takmir`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donasi`
--
ALTER TABLE `donasi`
  MODIFY `id_donasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id_kegiatan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `keuangan`
--
ALTER TABLE `keuangan`
  MODIFY `id_keuangan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  MODIFY `id_laporan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donasi`
--
ALTER TABLE `donasi`
  ADD CONSTRAINT `donasi_ibfk_1` FOREIGN KEY (`id_jamaah`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Constraints for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD CONSTRAINT `kegiatan_ibfk_1` FOREIGN KEY (`id_takmir`) REFERENCES `users` (`id_user`) ON DELETE SET NULL;

--
-- Constraints for table `keuangan`
--
ALTER TABLE `keuangan`
  ADD CONSTRAINT `keuangan_ibfk_1` FOREIGN KEY (`id_takmir`) REFERENCES `users` (`id_user`) ON DELETE SET NULL;

--
-- Constraints for table `laporan_keuangan`
--
ALTER TABLE `laporan_keuangan`
  ADD CONSTRAINT `laporan_keuangan_ibfk_1` FOREIGN KEY (`id_takmir`) REFERENCES `users` (`id_user`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
