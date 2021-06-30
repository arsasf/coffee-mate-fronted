-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 28 Jun 2021 pada 03.31
-- Versi Server: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffee_mate`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_size` varchar(100) NOT NULL,
  `product_sub_total` int(11) NOT NULL,
  `cart_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `invoice_code` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `promo_code` varchar(100) NOT NULL,
  `invoice_discount` int(11) NOT NULL,
  `invoice_all_product_price` int(11) NOT NULL,
  `invoice_tax` int(11) NOT NULL,
  `invoice_sub_total` int(11) NOT NULL,
  `invoice_status` enum('pending','done') NOT NULL,
  `invoice_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invoice_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_code`, `user_id`, `promo_code`, `invoice_discount`, `invoice_all_product_price`, `invoice_tax`, `invoice_sub_total`, `invoice_status`, `invoice_created_at`, `invoice_updated_at`) VALUES
(15, 'CM-4302', 10, 'MOTHER', 11250, 75000, 10000, 73750, 'done', '2021-06-27 23:20:34', '2021-06-28 00:35:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `orders_id` int(11) NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_qty` int(11) NOT NULL,
  `product_size` varchar(200) NOT NULL,
  `product_image` varchar(250) NOT NULL,
  `product_sub_total` int(11) NOT NULL,
  `orders_total_price` int(11) NOT NULL,
  `orders_payment_method` varchar(100) NOT NULL,
  `orders_status` enum('pending','done','cancel') NOT NULL,
  `orders_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orders_updated_at` timestamp NULL DEFAULT NULL,
  `orders_discount` varchar(50) NOT NULL,
  `orders_tax` int(11) NOT NULL,
  `orders_all_product_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`orders_id`, `invoice_id`, `product_id`, `user_id`, `product_qty`, `product_size`, `product_image`, `product_sub_total`, `orders_total_price`, `orders_payment_method`, `orders_status`, `orders_created_at`, `orders_updated_at`, `orders_discount`, `orders_tax`, `orders_all_product_price`) VALUES
(5, 5, 5, 8, 2, '', '', 0, 90000, 'card', 'done', '2021-06-22 10:30:17', '2021-06-22 10:34:37', '', 0, 0),
(6, 5, 4, 8, 2, '', '', 0, 90000, 'card', 'done', '2021-06-22 10:30:17', '2021-06-22 10:34:37', '', 0, 0),
(20, 15, 3, 10, 3, 'XL', '2021-06-23T01-14-44.153Zdefault-cold-brew.png', 75000, 73750, 'card', 'done', '2021-06-27 23:20:34', '2021-06-28 00:35:18', '11250', 10000, 75000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_image` varchar(200) NOT NULL,
  `product_name` varchar(250) NOT NULL,
  `product_category` enum('coffee','noncoffee','food','addon') NOT NULL,
  `product_base_price` int(11) NOT NULL,
  `product_desc` varchar(250) NOT NULL,
  `product_size` varchar(100) NOT NULL,
  `product_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`product_id`, `product_image`, `product_name`, `product_category`, `product_base_price`, `product_desc`, `product_size`, `product_created_at`, `product_updated_at`) VALUES
(3, '2021-06-23T01-14-44.153Zdefault-cold-brew.png', 'Fried Rice Chicken', 'food', 20000, '-', 'R, L, XL', '2021-06-20 09:23:24', '2021-06-23 01:14:44'),
(8, '2021-06-23T01-09-54.563Zproduct1.png', 'Veggie tomato mix', 'food', 30000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-22 20:20:56', '2021-06-23 01:12:22'),
(10, '2021-06-23T02-15-44.700Zpayment-img-menu-2.png', 'Summer fried rice', 'food', 30000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-23 02:15:44', NULL),
(11, '2021-06-23T02-17-40.348Zproduct4.png', 'Summer fried ', 'food', 25000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-23 02:17:40', NULL),
(13, '2021-06-24T10-09-31.534Zproduct3.png', 'Coffe Latte', 'coffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-24 06:16:53', '2021-06-24 10:16:07'),
(15, '2021-06-24T10-29-57.624Zdefault-cold-brew.png', 'Coffee Brown', 'coffee', 40000, 'Buy one get one', 'R, L, XL', '2021-06-24 08:38:00', '2021-06-24 10:29:57'),
(16, '2021-06-24T10-46-54.388Zpayment-img-menu-2.png', 'Sate Ayam', 'food', 15000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-24 10:46:54', '2021-06-24 10:47:26'),
(17, '2021-06-24T12-44-16.999Zproduct1.png', 'Nasi Ayam', 'food', 10000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-24 12:44:17', '2021-06-24 12:45:01'),
(21, '2021-06-24T15-25-36.857Zdefault-cold-brew.png', 'Cold Brew', 'noncoffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-24 15:25:36', '2021-06-24 15:26:48'),
(22, '2021-06-26T06-50-59.137Zdefault-cold-brew.png', 'Ice Tea', 'noncoffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 06:50:59', NULL),
(23, '2021-06-26T06-52-37.258Zdefault-cold-brew.png', 'Ice Tea', 'noncoffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 06:52:37', NULL),
(25, '2021-06-26T07-11-31.663Zdefault-cold-brew.png', 'Cold Brew', 'coffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 07:11:32', NULL),
(26, '2021-06-26T07-14-47.190Zdefault-cold-brew.png', 'Cold Brew', 'noncoffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 07:14:47', NULL),
(27, '2021-06-26T07-17-42.695Zdefault-cold-brew.png', 'Cold Brew', 'noncoffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 07:17:42', NULL),
(28, '2021-06-26T07-22-05.860Zdefault-cold-brew.png', 'Nasi Ayam', 'food', 2000, 'Buy one get one', 'R, L, XL', '2021-06-26 07:22:05', NULL),
(29, '2021-06-26T07-25-53.445Zdefault-cold-brew.png', 'Cold Brew 2', 'coffee', 20000, 'Buy one get one', 'R, L, XL', '2021-06-26 07:25:53', NULL),
(30, '2021-06-26T07-28-43.951Zdefault-cold-brew.png', 'Meat Ball', 'food', 25000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-26 07:28:43', NULL),
(31, '2021-06-26T07-47-57.953Z_aeppol___Bma2mFFAwsk___.jpg', 'Nasi Ayam', 'food', 20000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-26 07:47:58', NULL),
(32, '2021-06-26T08-00-57.236Zproduct4.png', 'Meat Ball', 'food', 40000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-26 08:00:57', NULL),
(33, '2021-06-26T08-18-39.437Zdefault-cold-brew.png', 'Coffee Mix', 'coffee', 53000, 'Buy one get one', 'R, L, XL', '2021-06-26 08:18:39', NULL),
(34, '2021-06-27T14-29-38.533Zproduct7.png', 'Gorengan', 'food', 20000, 'Buy one get one', '250gr, 300gr, 500gr', '2021-06-27 14:29:38', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo`
--

CREATE TABLE `promo` (
  `promo_id` int(11) NOT NULL,
  `promo_image` varchar(250) NOT NULL,
  `promo_name` varchar(250) NOT NULL,
  `promo_discount` varchar(100) NOT NULL,
  `promo_min_price` int(11) NOT NULL,
  `promo_max_discount` int(11) NOT NULL,
  `promo_code` varchar(200) NOT NULL,
  `promo_desc` varchar(250) NOT NULL,
  `promo_expire_start` date DEFAULT NULL,
  `promo_expire_end` date DEFAULT NULL,
  `promo_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `promo_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `promo`
--

INSERT INTO `promo` (`promo_id`, `promo_image`, `promo_name`, `promo_discount`, `promo_min_price`, `promo_max_discount`, `promo_code`, `promo_desc`, `promo_expire_start`, `promo_expire_end`, `promo_created_at`, `promo_updated_at`) VALUES
(2, '2021-06-27T12-06-57.419Zsketch1.png', 'Mother\'s Day', '15%', 50000, 50000, 'MOTHER', 'You can use this promo for all product', '2021-06-26', '2021-06-30', '2021-06-26 10:39:49', '2021-06-27 12:18:57'),
(3, '2021-06-27T13-16-27.551Zsketch2.png', 'Father\'s Day', '15%', 70000, 100000, 'FATHER', 'yooo', '2021-06-26', '2021-06-29', '2021-06-26 10:46:01', '2021-06-27 13:16:27'),
(4, '2021-06-26T10-51-37.371Zsketch2.png', 'Father\'s Day', '20%', 60000, 100000, 'FATHERA01', 'yeee', '2021-06-26', '2021-06-30', '2021-06-26 10:51:37', NULL),
(5, '2021-06-26T10-55-39.970Zsketch3.png', 'Hari Merdeka !', '30%', 50000, 100000, 'MERDEKA', 'yoooo', '2021-06-26', '2021-06-30', '2021-06-26 10:55:40', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_role` enum('user','admin') NOT NULL,
  `user_verified` enum('0','1') NOT NULL,
  `user_otp` varchar(200) DEFAULT NULL,
  `user_image` varchar(200) DEFAULT NULL,
  `user_name` varchar(250) DEFAULT NULL,
  `user_display_name` varchar(250) DEFAULT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_phone` varchar(250) DEFAULT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_address` varchar(250) DEFAULT NULL,
  `user_gender` enum('male','female') NOT NULL,
  `user_birth` date DEFAULT NULL,
  `user_coupon` enum('no','yes','','') NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_role`, `user_verified`, `user_otp`, `user_image`, `user_name`, `user_display_name`, `user_email`, `user_phone`, `user_password`, `user_address`, `user_gender`, `user_birth`, `user_coupon`, `user_created_at`, `user_updated_at`) VALUES
(8, 'admin', '1', '5767', '2021-06-21T08-49-12.572Z_aeppol_BiT6Wh9guQh_1.jpg', 'Rachel Amanda', 'Rachel', 'cinemars.user@gmail.com', '(+99) 0875 3452', '$2b$10$Ys087zeglJ52Hm7SP/1DHuPskd60OBUItJ85pLAi2SOBWK0peUrT6', 'South Borneo', 'female', '1998-04-16', 'no', '2021-06-19 10:04:38', '2021-06-27 20:14:01'),
(9, 'user', '0', '', '', '', '', 'cali.turcotte76@ethereal.email', '123', '$2b$10$WMd/ZEgOQ2BNC.ANzbGD/O5v2e0vjW8YDKbwYWb/qxSQ87Hry/7Oi', '', 'male', '0000-00-00', 'no', '2021-06-19 12:19:15', '0000-00-00 00:00:00'),
(10, 'user', '1', NULL, '2021-06-22T01-06-36.519Z_aeppol_BiT6Wh9guQh_1.jpg', 'Aulia Safitri', 'Aul', 'auliasafitri2698@gmail.com', '(+62) 899 0075 3452', '$2b$10$GfFYU/PlxL2kkvTgwCvXHuIP4lZQ1pEWvSoJ.MTLeFDChKIQHPALy', 'Banjarmasin', 'female', '1998-12-26', 'yes', '2021-06-22 00:30:29', '2021-06-22 01:08:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orders_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promo_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
