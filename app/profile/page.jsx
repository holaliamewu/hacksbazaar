"use client";

import { useState } from 'react'
import { Avatar, Button, Card, Divider, Text, Spacer, Image, Grid, Link } from '@geist-ui/core'
import { MessageCircle, Repeat, Heart, Share, Briefcase } from '@geist-ui/icons'
import { useAuth } from '@/lib/shared/contexts/SignupContext';

export default function ProfilePage() {
  const user = {
    name: "Jane Smith",
    role: "designer",
    bio: "building hacksbazaar on the side.",
    avatar: "",
    stats: {
      posts: 2
    },
  }

  const { form } = useAuth();

const userEmoji = form.currentEmoji;

  const [ hacks, setHacks ] = useState([])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative">
        { user.avatar.length > 1 ? 
            <Avatar src={user.avatar} alt={user.name} className="absolute bottom-0 left-4 transform translate-y-1/2" size="large" isSquare />
            : <span className=" border rounded p-1  transform translate-y-2/3 text-2xl" >{userEmoji}</span> }
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div>
            <Text h1 className="text-lg font-bold">{user.name}</Text>
            <div className='flex space-x-1' >
                <Briefcase color="gray" size={14} inline w={.35} />
                <Text type="secondary" className="text-gray-500 text-xs">{user.role}</Text>
            </div>
          </div>
          <Link href="/editprofile" >
            <Button scale={0.5} auto>Edit profile</Button>
          </Link>
        </div>
        <Text className="mt-2 text-sm">{user.bio}</Text>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span>{user.stats.posts} hacks</span>
        </div>
      </div>
      <Spacer y={2} />
      <Divider />
      <Text h2 className="text-sm font-semibold mb-4">Your Hacks</Text>
      <Grid.Container gap={2} justify="center">
        {hacks.map((post) => (
          <Grid xs={24} key={post.id}>
            <Card shadow>
              <Card.Content>
                <div className="flex items-center">
                  <Avatar src={user.avatar} alt={user.name} size="small" isSquare className="mr-2" />
                  <div>
                    <Text b>{user.name}</Text>
                    <Text small type="secondary">{user.role}</Text>
                  </div>
                </div>
                <Text className="mt-4">{post.content}</Text>
              </Card.Content>
              <Divider y={1} />
              <Card.Footer>
                <div className="flex justify-between w-full text-gray-500">
                  <Button auto scale={0.8} iconRight={<MessageCircle />} size="mini">{post.comments}</Button>
                  <Button auto scale={0.8} iconRight={<Repeat />} size="mini">{post.retweets}</Button>
                  <Button auto scale={0.8} iconRight={<Heart />} size="mini" className="text-red-500">{post.likes}</Button>
                  <Button auto scale={0.8} iconRight={<Share />} size="mini" />
                </div>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  )
}
