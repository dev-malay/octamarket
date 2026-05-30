import { createClient } from "@supabase/supabase-js";
import {   useState } from "react";


export function useSupabase() {

    const [supabase, setSupabase] = useState(createClient("https://tiqwzsehcnqiypxonwkp.supabase.co","sb_publishable_1SVd-OFCAXxkAR95Kn09BA_q4ajrHTd"))

    return supabase 


} 