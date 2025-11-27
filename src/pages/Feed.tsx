import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  created_at: string;
  profiles: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
  likes: { id: string }[];
  comments: { id: string }[];
}

const Feed = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchPosts();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles(username, full_name, avatar_url),
          likes(id),
          comments(id)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPost.trim() || !user) return;

    try {
      const { error } = await supabase.from("posts").insert({
        user_id: user.id,
        content: newPost,
      });

      if (error) throw error;
      setNewPost("");
      toast.success("Post created!");
      fetchPosts();
    } catch (error: any) {
      toast.error("Failed to create post");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">Ronin</div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-24 pb-12 max-w-2xl">
        {/* Create Post */}
        <Card className="glass-strong border-primary/30 p-6 mb-8">
          <Textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="mb-4 min-h-[100px] glass"
          />
          <Button 
            onClick={createPost} 
            className="w-full glow-sm hover:glow-md transition-all"
            disabled={!newPost.trim()}
          >
            Share Post
          </Button>
        </Card>

        {/* Posts Feed */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading posts...</div>
        ) : posts.length === 0 ? (
          <Card className="glass-strong border-border/50 p-12 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="glass-strong border-border/50 p-6 hover:border-primary/30 transition-all">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={post.profiles.avatar_url || undefined} />
                    <AvatarFallback>
                      {post.profiles.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">
                        {post.profiles.full_name || post.profiles.username}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        @{post.profiles.username}
                      </span>
                    </div>

                    <p className="text-foreground mb-4">{post.content}</p>

                    <div className="flex items-center gap-6 text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Heart className="h-5 w-5" />
                        <span>{post.likes.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;