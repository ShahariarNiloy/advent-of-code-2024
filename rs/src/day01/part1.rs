use std::env;
use std::fs;

fn total_diff(left_arr: &[i32], right_arr: &[i32]) -> i32 {
    let mut left_sorted = left_arr.to_vec();
    let mut right_sorted = right_arr.to_vec();

    left_sorted.sort();
    right_sorted.sort();

    let mut total_diff = 0;

    for i in 0..left_sorted.len() {
        total_diff += (left_sorted[i] - right_sorted[i]).abs();
    }

    total_diff
}

fn get_arr_from_file(file_path: &str) -> (Vec<i32>, Vec<i32>) {
    let data = fs::read_to_string(file_path).expect("Unable to read file");
    let mut left_arr = Vec::new();
    let mut right_arr = Vec::new();

    for line in data.lines() {
        let parts: Vec<i32> = line
            .split_whitespace()
            .map(|s| s.parse().unwrap())
            .collect();
        left_arr.push(parts[0]);
        right_arr.push(parts[1]);
    }

    (left_arr, right_arr)
}

pub fn part1() {
    let current_dir = env::current_dir().expect("Failed to get current directory");

    // Join the file name to the current directory to form the full path
    let file_path = current_dir.join("src/day01/input.txt");

    // Convert PathBuf to &str, unwrap to panic if it's not valid
    let file_path_str = file_path
        .to_str()
        .expect("Failed to convert PathBuf to &str");
    let (left_arr, right_arr) = get_arr_from_file(file_path_str);
    let result = total_diff(&left_arr, &right_arr);
    println!("{}", result);
}
