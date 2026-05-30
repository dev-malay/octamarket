import { useSupabase } from "./hooks/useSupabase";
import { useUser } from "./hooks/useUser";


function App() {

  const { claims } = useUser()
  const supabase = useSupabase()


    return <div>{ window.phantom?.solana && !claims && 
      <button onClick={async() => { 
        try {
          if (!window.phantom?.solana?.publicKey) {
            await window.phantom?.solana?.connect();
          }
          await supabase.auth.signInWithWeb3({
            chain: 'solana',
            statement: 'I want to sign in with Solana. Please connect wallet',
            wallet: window.phantom?.solana
          });
        } catch (err) {
          console.error("Wallet sign-in failed:", err);
        }
      }}>signin with solana</button>}

      {claims && <button onClick={async () => { await supabase.auth.signOut()}}>logout</button>}

      {JSON.stringify(claims)}
    </div>


  }  


export default App;
