import sqlite3
import pandas as pd
from tabulate import tabulate
import json

db_path = "verifdoc.db"

def inspect_users():
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get Users
        users_df = pd.read_sql_query("SELECT id, email, full_name, role, credits_balance, created_at, is_active FROM users", conn)
        
        # Get Transaction counts per user
        try:
            tx_counts = pd.read_sql_query("SELECT user_id, COUNT(*) as transaction_count FROM transactions GROUP BY user_id", conn)
            users_df = users_df.merge(tx_counts, left_on='id', right_on='user_id', how='left').fillna(0)
        except:
             users_df['transaction_count'] = 0

        # Get Analysis counts per user
        try:
            analysis_counts = pd.read_sql_query("SELECT user_id, COUNT(*) as analysis_count FROM analysis_records GROUP BY user_id", conn)
            users_df = users_df.merge(analysis_counts, left_on='id', right_on='user_id', how='left').fillna(0)
        except:
             users_df['analysis_count'] = 0

        print(f"\n[ TOTAL USERS: {len(users_df)} ]")
        
        # Display nicely
        display_df = users_df[['id', 'email', 'role', 'credits_balance', 'analysis_count']]
        display_df.columns = ['ID', 'Email', 'Role', 'Credits', 'Analyses Run']
        print(tabulate(display_df, headers='keys', tablefmt='grid', showindex=False))

        print("\n[ DETAILED ARCHITECTURE PER USER ]")
        for _, row in users_df.iterrows():
            print(f"\nUser ID: {row['id']} ({row['email']})")
            print(f"  - Role: {row['role']}")
            print(f"  - Status: {'Active' if row['is_active'] else 'Inactive'}")
            print(f"  - Financial Architecture: {int(row['credits_balance'])} Credits available")
            print(f"  - Data Footprint: {int(row['analysis_count'])} Documents Analyzed")
            # print(f"  - Transaction History: {int(row['transaction_count'])} Transactions")

        conn.close()
    except Exception as e:
        print(f"Error inspecting database: {e}")

if __name__ == "__main__":
    inspect_users()
