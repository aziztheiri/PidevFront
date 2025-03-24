import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { ForumService } from 'src/app/services/forum.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  posts: Post[] = [];
  loading = false;
  error = '';

  // Modal state
  showAddModal = false;
  addPostForm!: FormGroup;
  adding = false;
  addError = '';

  constructor(private forumService: ForumService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.addPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  fetchPosts(): void {
    this.loading = true;
    this.forumService.getPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error fetching posts.';
        this.loading = false;
      }
    });
  }

  openAddPostModal(): void {
    this.showAddModal = true;
    this.addError = '';
    this.addPostForm.reset();
  }

  closeAddPostModal(): void {
    this.showAddModal = false;
  }

  onAddPost(): void {
    if (this.addPostForm.invalid) {
      return;
    }
    this.adding = true;
    // Create the post using the service; it uses the current user's CIN internally.
    this.forumService.createPost(this.addPostForm.value).subscribe({
      next: (data: Post) => {
        this.adding = false;
        this.closeAddPostModal();
        this.fetchPosts(); // Refresh posts list
      },
      error: (err) => {
        console.error(err);
        this.addError = 'Failed to add post. Please try again.';
        this.adding = false;
      }
    });
  }
}
