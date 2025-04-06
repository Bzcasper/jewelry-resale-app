// lib/supabaseUtils.js
import { supabase } from './supabase'

// Function to fetch all content items
export async function getAllContent() {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching content:', error)
    return []
  }
  
  return data || []
}

// Function to fetch a single content item by ID
export async function getContentById(id) {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching content item:', error)
    return null
  }
  
  return data
}

// Function to create a new content item
export async function createContent(contentData) {
  const { data, error } = await supabase
    .from('content')
    .insert([contentData])
    .select()
  
  if (error) {
    console.error('Error creating content:', error)
    return null
  }
  
  return data[0]
}

// Function to update an existing content item
export async function updateContent(id, contentData) {
  const { data, error } = await supabase
    .from('content')
    .update(contentData)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating content:', error)
    return null
  }
  
  return data[0]
}

// Function to delete a content item
export async function deleteContent(id) {
  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting content:', error)
    return false
  }
  
  return true
}
